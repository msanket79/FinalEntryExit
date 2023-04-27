# Generated by Django 4.1.5 on 2023-04-25 10:31

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('outpass', '0001_initial'),
        ('users', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='staff_profile',
            name='admin',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='staff_profile',
            name='students',
            field=models.ManyToManyField(to='users.student_profile'),
        ),
        migrations.AddField(
            model_name='outpass',
            name='entry',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='users.entry_exit'),
        ),
        migrations.AddField(
            model_name='outpass',
            name='roll_no',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.student_profile'),
        ),
    ]
