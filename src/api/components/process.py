import asyncio
from typing import Tuple

from components.helper import make_choice, read_json


async def generate_question() -> Tuple[str, str]:
    continent_data, neighbour_data = await asyncio.gather(
        read_json(r"./data/continent_countries.json"),
        read_json(r"./data/neighbouring_countries.json"),
    )
    choices = ("Asia", "America", "Africa", "Europe", "Asia-Europe", "Asia-Africa")
    continent, _ = make_choice(choices)
    if continent in ("Asia-Europe", "Asia-Africa"):
        continent1, continent2 = continent.split("-")
        countries_list = continent_data[continent1] + continent_data[continent2]
    else:
        countries_list = continent_data[continent]
    return make_choice(countries_list, neighbour_data)
