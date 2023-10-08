import os
import spacy
from spacy.training.example import Example
import random
from flask import jsonify
from ml_model_v2 import social_field_labels, use_api_labels, social_context_labels, train_texts

MODEL_DIR = 'saved_models'

def get_result_by_max(cats):
    return max(cats, key=cats.get)

def train_model(train_texts, train_labels, learning_rate=0.001):
    nlp = spacy.blank("en")
    textcat = nlp.add_pipe("textcat", last=True)
    for label in train_labels[0]["cats"].keys():
        textcat.add_label(label)

    optimizer = nlp.begin_training()
    optimizer.learn_rate = learning_rate

    train_data = list(zip(train_texts, train_labels))
    train_examples = [Example.from_dict(nlp.make_doc(text), annotations) for text, annotations in train_data]

    random.seed(1)
    spacy.util.fix_random_seed(32)

    for epoch in range(20):
        random.shuffle(train_examples)
        losses = {}
        for batch in spacy.util.minibatch(train_examples, size=256):
            nlp.update(batch, drop=0.3, losses=losses, sgd=optimizer)

    return nlp

def save_model(nlp, model_name):
    if not os.path.exists(MODEL_DIR):
        os.makedirs(MODEL_DIR)
    nlp.to_disk(os.path.join(MODEL_DIR, model_name))

def load_model(model_name):
    return spacy.load(os.path.join(MODEL_DIR, model_name))

def setup_models():
    if not os.path.exists(os.path.join(MODEL_DIR, 'social_field')):
        social_field_nlp = train_model(train_texts, social_field_labels, learning_rate=0.001)
        save_model(social_field_nlp, 'social_field')
    else:
        social_field_nlp = load_model('social_field')

    if not os.path.exists(os.path.join(MODEL_DIR, 'use_api')):
        use_api_nlp = train_model(train_texts, use_api_labels, learning_rate=0.001)
        save_model(use_api_nlp, 'use_api')
    else:
        use_api_nlp = load_model('use_api')

    if not os.path.exists(os.path.join(MODEL_DIR, 'social_context')):
        social_context_nlp = train_model(train_texts, social_context_labels, learning_rate=0.001)
        save_model(social_context_nlp, 'social_context')
    else:
        social_context_nlp = load_model('social_context')

    return social_field_nlp, use_api_nlp, social_context_nlp

def run(input_query, social_field_nlp, use_api_nlp, social_context_nlp):
    doc_field = social_field_nlp(input_query)
    doc_api = use_api_nlp(input_query)
    doc_context = social_context_nlp(input_query)

    max_field_category = get_result_by_max(doc_field.cats)
    max_api_category = get_result_by_max(doc_api.cats)
    max_context_category = get_result_by_max(doc_context.cats)

    return jsonify({"input": input_query, "field": max_field_category, "api": max_api_category, "context": max_context_category})
