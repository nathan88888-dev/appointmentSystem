from langchain.prompts import PromptTemplate


def build_prompt(topic: str) -> str:
    template = PromptTemplate.from_template("Give a short summary about: {topic}")
    return template.format(topic=topic)
