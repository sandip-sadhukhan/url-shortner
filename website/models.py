from django.db import models


class URLShort(models.Model):
    url = models.URLField(blank=False, null=False)
    sid = models.CharField(max_length=6, primary_key=True, null=False, blank=False)

    def __str__(self):
        return self.url


