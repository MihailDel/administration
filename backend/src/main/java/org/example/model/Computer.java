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
@Document(collection = "computers")
public class Computer {
    @Id
    private String id;
    private String processor;
    private String graphics;
    private String memory;
    private String ssd;

    @Override
    public String toString() {
        return "Computer{" +
                "id='" + id + '\'' +
                ", processor='" + processor + '\'' +
                ", graphics='" + graphics + '\'' +
                ", memory='" + memory + '\'' +
                ", ssd='" + ssd + '\'' +
                '}';
    }
}
