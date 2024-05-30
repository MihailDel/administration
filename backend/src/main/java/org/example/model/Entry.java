package org.example.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "entries")
public class Entry {
    @Id
    private String id;
    private String first_name;
    private String last_name;
    private String telephoneNumber;
    private String dateEntry;

}
