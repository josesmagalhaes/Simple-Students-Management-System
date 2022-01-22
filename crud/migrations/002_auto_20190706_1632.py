from enum import unique
from pyexpat import model
from django.db import migrations, models

class Migration(migrations.Migration):
    dependencies = [
        ('crud', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='roll',
            field=models.IntegerField(unique=True)
        )
    ]