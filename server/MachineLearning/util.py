import spacy

import os
from typing import List


def create_model_cache(nlp, model_dir, model_name):
    if not os.path.exists(model_dir):
        os.makedirs(model_dir)
    nlp.to_disk(os.path.join(model_dir, model_name))


def load_model_cache(model_dir, model_name):
    return spacy.load(os.path.join(model_dir, model_name))


def get_result_by_max(cats):
    return max(cats, key=cats.get)


def jaccard_similarity(s1, s2):
    a = set(s1.split())
    b = set(s2.split())
    intersection = len(a.intersection(b))
    union = len(a.union(b))
    return intersection / union if union != 0 else 0


def most_related_phrases(phrases: List[str], input_phrase: str, n: int):
    phrases = [phrase for phrase in phrases if phrase != input_phrase]

    similarities = [(phrase, jaccard_similarity(input_phrase, phrase))
                    for phrase in phrases]

    similarities.sort(key=lambda x: x[1], reverse=True)

    related_phrases = [phrase for phrase, _ in similarities[:n]]

    return related_phrases
