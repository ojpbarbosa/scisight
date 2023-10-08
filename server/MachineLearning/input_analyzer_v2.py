import spacy
from spacy.training.example import Example
import random
from ml_model_v2 import socialField_labels, useAPI_labels, socialContext_labels, train_texts


def get_max_category(cats):
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
    spacy.util.fix_random_seed(1)

    for epoch in range(15):
        random.shuffle(train_examples)
        losses = {}
        for batch in spacy.util.minibatch(train_examples, size=128):
            nlp.update(batch, drop=0.3, losses=losses, sgd=optimizer)
    return nlp

def setup_models():
    social_field_nlp = train_model(train_texts, socialField_labels, learning_rate=0.001)
    use_api_nlp = train_model(train_texts, useAPI_labels, learning_rate=0.001)
    social_context_nlp = train_model(train_texts, socialContext_labels, learning_rate=0.001)
    return social_field_nlp, use_api_nlp, social_context_nlp

def run(input_query, social_field_nlp, use_api_nlp, social_context_nlp):
    doc_field = social_field_nlp(input_query)
    doc_api = use_api_nlp(input_query)
    doc_context = social_context_nlp(input_query)

    max_field_category = get_max_category(doc_field.cats)
    max_api_category = get_max_category(doc_api.cats)
    max_context_category = get_max_category(doc_context.cats)
    
    print(f"Field: {max_field_category}, API: {max_api_category}, Context: {max_context_category}")
    return max_field_category, max_api_category, max_context_category


def main():
    social_field_nlp, use_api_nlp, social_context_nlp = setup_models()
    input_query = "I'm researching neurology and am interested to get some information about planets and galaxies. Can you give me some information?"
    run(input_query, social_field_nlp, use_api_nlp, social_context_nlp)

main()
