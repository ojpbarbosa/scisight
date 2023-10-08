import spacy
from spacy.training.example import Example
from flask import jsonify

import random
import os

from ml_model_v1 import occupation_labels, field_labels, train_texts
from util import get_result_by_max, create_model_cache, load_model_cache

MODEL_DIR = "cache/v1"


def train_model(train_texts, train_labels):
    nlp = spacy.blank("en")
    textcat = nlp.add_pipe("textcat", last=True)
    for label in train_labels[0]["cats"].keys():
        textcat.add_label(label)

    train_data = list(zip(train_texts, train_labels))
    train_examples = [Example.from_dict(nlp.make_doc(
        text), annotations) for text, annotations in train_data]

    random.seed(1)
    spacy.util.fix_random_seed(2)
    nlp.begin_training()

    for epoch in range(15):
        random.shuffle(train_examples)
        losses = {}
        for batch in spacy.util.minibatch(train_examples, size=32):
            nlp.update(batch, drop=0.3, losses=losses)

    return nlp


def setup_models():
    if not os.path.exists(os.path.join(MODEL_DIR, "field_nlp")):
        field_nlp = train_model(train_texts, field_labels)
        create_model_cache(field_nlp, MODEL_DIR, "field_nlp")
    else:
        field_nlp = load_model_cache(MODEL_DIR, "field_nlp")

    if not os.path.exists(os.path.join(MODEL_DIR, "occupation_nlp")):
        occupation_nlp = train_model(train_texts, occupation_labels)
        create_model_cache(occupation_nlp, MODEL_DIR, "occupation_nlp")
    else:
        occupation_nlp = load_model_cache(MODEL_DIR, "occupation_nlp")

    return field_nlp, occupation_nlp


def run(input_query, nlp_field, nlp_occupation):
    doc_field = nlp_field(input_query)
    doc_occupation = nlp_occupation(input_query)

    max_field_category = get_result_by_max(doc_field.cats)
    max_occupation_category = get_result_by_max(doc_occupation.cats)
    return jsonify({"input": input_query, "field": max_field_category, "occupation": max_occupation_category})
