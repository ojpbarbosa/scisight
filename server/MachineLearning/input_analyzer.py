import spacy
from spacy.training.example import Example
import random
from ml_model import occupation_labels, field_labels, train_texts
from flask import jsonify


def get_max_category(cats):
    return max(cats, key=cats.get)


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


def setup_model():
    field_nlp = train_model(train_texts, field_labels)
    occupation_nlp = train_model(train_texts, occupation_labels)
    return field_nlp, occupation_nlp


def run(input_query, nlp_field, nlp_occupation):
    # testing the models
    doc_field = nlp_field(input_query)
    doc_occupation = nlp_occupation(input_query)

    # getting the maximum category for each model
    max_field_category = get_max_category(doc_field.cats)
    max_occupation_category = get_max_category(doc_occupation.cats)
    return jsonify({"input": input_query, "field": max_field_category, "occupation": max_occupation_category})
