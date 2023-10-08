import spacy

import os


def create_model_cache(nlp, model_dir, model_name):
    if not os.path.exists(model_dir):
        os.makedirs(model_dir)
    nlp.to_disk(os.path.join(model_dir, model_name))


def load_model_cache(model_dir, model_name):
    return spacy.load(os.path.join(model_dir, model_name))


def get_result_by_max(cats):
    return max(cats, key=cats.get)
