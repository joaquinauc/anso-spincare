from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField, SelectField, IntegerField
from wtforms.fields.simple import TextAreaField
from wtforms.validators import DataRequired, ValidationError, Email, EqualTo, Length

import sqlalchemy as sa

from app import db
from app.models import User

class LoginForm(FlaskForm):
    password = PasswordField('Password', validators=[DataRequired()])


class AddUserForm(FlaskForm):
    user_name = StringField('Names', validators=[DataRequired()])
    user_first_last_name = StringField('First Last Name', validators=[DataRequired()])
    user_second_last_name = StringField('Second Last Name')
    user_password = PasswordField('Password', validators=[DataRequired()])
    user_role = StringField('Role', validators=[DataRequired()])


class AddPatientForm(FlaskForm):
    user_name = StringField('Name', validators=[DataRequired()])
    user_age = IntegerField('Age', validators=[DataRequired()])
    user_sex = StringField('Sex', validators=[DataRequired()])
    user_phone_number = IntegerField('Phone Number', validators=[DataRequired()])
    user_illness = StringField('Illness', validators=[DataRequired()])
    user_medicine = StringField('Medicine', validators=[DataRequired()])
    user_expedient_number = IntegerField('Expedient Number', validators=[DataRequired()])
    user_allergies = StringField('Allergies', validators=[DataRequired()])
    