import spacy
from spacy.training.example import Example
import random
from ml_model import prof_labels, study_labels, train_texts
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
    nlp_study = train_model(train_texts, study_labels)
    nlp_prof = train_model(train_texts, prof_labels)
    return nlp_study, nlp_prof


def run(input_query, nlp_study, nlp_prof):
    # testing the models
    doc_study = nlp_study(input_query)
    doc_prof = nlp_prof(input_query)

    # getting the maximum category for each model
    max_study_category = get_max_category(doc_study.cats)
    max_prof_category = get_max_category(doc_prof.cats)
    return jsonify({"input": input_query, "study": max_study_category, "profession": max_prof_category})
