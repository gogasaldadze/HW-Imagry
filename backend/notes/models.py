from django.db import models
import uuid


class Note(models.Model):
    uuid = models.UUIDField(
        default=uuid.uuid4, unique=True, editable=False, db_index=True
    )
    title = models.CharField(max_length=200)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "notes"
        verbose_name = "Note"
        verbose_name_plural = "Notes"
        ordering = ["-created_at"]

    def __str__(self):
        return self.title

