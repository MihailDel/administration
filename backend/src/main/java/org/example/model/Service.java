package org.example.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "services")
public class Service {
    @Id
    private String id;
    private String name;
    private String cost;
    private String periodOfExecution;
}
