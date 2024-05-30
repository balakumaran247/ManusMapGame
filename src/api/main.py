from typing import Dict

from fastapi import FastAPI

from components.process import generate_question

__version__ = "1.0.0"

app = FastAPI(title="Manu's Map Game", version=__version__)


@app.get("/")
def root() -> Dict[str, str]:
    return {"title": "Manu's Map Game API", "version": __version__}


@app.get("/question")
async def question() -> Dict[str, str]:
    start, end = await generate_question()
    return {"start": start, "end": end}
