import json
import random
from typing import Dict, List, Optional, Sequence, Tuple, overload

import aiofiles


async def read_json(filepath):
    async with aiofiles.open(filepath, mode="r") as file:
        content = await file.read()
    return json.loads(content)


@overload
def make_choice(
    primary: Sequence[str], supplementary: Optional[Dict[str, List[str]]] = None
) -> Tuple[str, None]: ...


@overload
def make_choice(
    primary: Sequence[str], supplementary: Dict[str, List[str]]
) -> Tuple[str, str]: ...


def make_choice(
    primary: Sequence[str], supplementary: Optional[Dict[str, List[str]]] = None
) -> Tuple[str, Optional[str]]:
    if not supplementary:
        return random.choice(primary), None
    first_value: str = random.choice(primary)
    second_value: str = random.choice(
        tuple(set(primary) - set(supplementary.get(first_value, [])) - {first_value})
    )
    return first_value, second_value
