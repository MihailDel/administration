package org.example.model.report;

import lombok.Data;

@Data
public class EmployeeSalaryRange {
    private int minPrice;
    private int maxPrice;

    public int getMinPrice() {
        return minPrice;
    }

    public int getMaxPrice() {
        return maxPrice;
    }
}
