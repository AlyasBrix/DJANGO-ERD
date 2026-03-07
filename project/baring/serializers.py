from rest_framework import serializers
from .models import Employee, Department, Project, EmployeeProject


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class EmployeeProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeeProject
        fields = '__all__'