import string
import random

from .models import URLShort

# Generate random id
def generateId():
    letters = list(string.ascii_letters) + list(string.digits)
    randomID = ''
    for i in range(6):
        randomID += random.choice(letters)

    if len(URLShort.objects.filter(sid=randomID))!=0:
        return generateId()
    return randomID
