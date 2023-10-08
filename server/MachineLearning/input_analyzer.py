import spacy
from spacy.training.example import Example
import random
from ml_model import prof_labels, study_labels, train_texts

def get_max_category(cats):
    return max(cats, key=cats.get)

def train_model(train_texts, train_labels):
    nlp = spacy.blank("en")
    textcat = nlp.add_pipe("textcat", last=True)
    for label in train_labels[0]["cats"].keys():
        textcat.add_label(label)

    train_data = list(zip(train_texts, train_labels))
    train_examples = [Example.from_dict(nlp.make_doc(text), annotations) for text, annotations in train_data]

    random.seed(1)
    spacy.util.fix_random_seed(2)
    optimizer = nlp.begin_training()

    for epoch in range(10):
        random.shuffle(train_examples)
        losses = {}
        for batch in spacy.util.minibatch(train_examples, size=64):
            nlp.update(batch, drop=0.5, losses=losses)
        print(losses)
    
    return nlp

# Treinando os modelos
nlp_study = train_model(train_texts, study_labels)
nlp_prof = train_model(train_texts, prof_labels)

# Testando os modelos
test_text = "I have been doing researches about some planets and stuff"
doc_study = nlp_study(test_text)
doc_prof = nlp_prof(test_text)

# Obtendo a categoria com a maior probabilidade para cada modelo
max_study_category = get_max_category(doc_study.cats)
max_prof_category = get_max_category(doc_prof.cats)

print("Study:", max_study_category)
print("Profession:", max_prof_category)
