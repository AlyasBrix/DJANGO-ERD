from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Employee, Department, Project, EmployeeProject
from .serializers import (
    EmployeeSerializer,
    DepartmentSerializer,
    ProjectSerializer,
    EmployeeProjectSerializer
)


# EMPLOYEE
class EmployeeListCreateView(ListCreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


class EmployeeRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


# DEPARTMENT
class DepartmentListCreateView(ListCreateAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer


class DepartmentRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer


# PROJECT
class ProjectListCreateView(ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class ProjectRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


# EMPLOYEE PROJECT
class EmployeeProjectListCreateView(ListCreateAPIView):
    queryset = EmployeeProject.objects.all()
    serializer_class = EmployeeProjectSerializer


class EmployeeProjectRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = EmployeeProject.objects.all()
    serializer_class = EmployeeProjectSerializer