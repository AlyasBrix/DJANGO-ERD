from django.db import models


class Employee(models.Model):
    employee_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50)
    date_of_birth = models.DateField()
    address = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Department(models.Model):
    department_id = models.AutoField(primary_key=True)
    department_name = models.CharField(max_length=50)

    def __str__(self):
        return self.department_name


class Project(models.Model):
    project_id = models.AutoField(primary_key=True)
    project_name = models.CharField(max_length=50)

    department = models.ForeignKey(
        Department,
        on_delete=models.CASCADE,
        related_name="projects"
    )

    employees = models.ManyToManyField(
        Employee,
        through="EmployeeProject",
        related_name="projects"
    )

    def __str__(self):
        return self.project_name


class EmployeeProject(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('employee', 'project')

    def __str__(self):
        return f"{self.employee} - {self.project}"