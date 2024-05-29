from fastapi import FastAPI

__version__ = "0.0.1"

app = FastAPI(title="JaltolAI", version=__version__)

@app.get("/")
def root():
	return {
        'title': "Manu's Map Game API",
        'version': __version__
    }
