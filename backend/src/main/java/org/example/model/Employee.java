package org.example.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Document(collection = "employees")
public class Employee {
    @Id
    private String id;
    private String last_name;
    private String first_name;
    private String patronymic;
    private String position;
    private int salary;

    @Override
    public String toString() {
        return "Employee{" +
                "id='" + id + '\'' +
                ", last_name='" + last_name + '\'' +
                ", first_name='" + first_name + '\'' +
                ", patronymic='" + patronymic + '\'' +
                ", position='" + position + '\'' +
                ", salary=" + salary +
                '}';
    }
}
