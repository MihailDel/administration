package org.example.controller;

import org.example.model.Entry;
import org.example.model.Employee;
import org.example.model.Service;
import org.example.model.report.EmployeeAverageSalary;
import org.example.model.report.EmployeeCount;
import org.example.model.report.EmployeeSalaryRange;
import org.example.service.MongoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;

@RestController
public class MainController {
    @Autowired
    MongoTemplate mongoTemplate;
    @Autowired
    MongoService mongoService;
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String name, @RequestParam String password) {

        mongoTemplate = mongoService.mongoTemplate(name, password);
        return ResponseEntity.ok("Аунтефикация прошла успешно");
    }

    @GetMapping("/employees")
    public ResponseEntity<List<Employee>> employees() {
        List<Employee> list = mongoTemplate.findAll(Employee.class);
        return ResponseEntity.ok(list);
    }
    @GetMapping("/employees/{id}")
    public ResponseEntity<Employee> employeeById(@PathVariable  String id) {
        Employee list = mongoTemplate.findById(id, Employee.class);
        return ResponseEntity.ok(list);
    }

    @PostMapping("/employees/delete")
    public ResponseEntity<String> deleteEmployee(@RequestBody Employee employee) {
        mongoTemplate.remove(employee);
        return ResponseEntity.ok("Удалено");
    }
    @PostMapping("/employees/add")
    public ResponseEntity<String> saveEmployee(@RequestBody Employee employee) {
        mongoTemplate.save(employee);
        return ResponseEntity.ok("Обновлен успешно");
    }
    @GetMapping("/employees/search")
    public ResponseEntity<List<Employee>> employeeByLastName(@RequestParam String lastName) {
        BasicQuery query = new BasicQuery(String.format("{ last_name: {$regex: '%s', $options: 'i'} }", lastName));
        List<Employee> list = mongoTemplate.find(query, Employee.class);
        return ResponseEntity.ok(list);
    }
    @GetMapping("/employees/range-salary")
    public ResponseEntity<EmployeeSalaryRange> employeeSalaryRange() {
        Aggregation aggregation = newAggregation(
                group()
                        .min("salary").as("minPrice")
                        .max("salary").as("maxPrice")
        );

        AggregationResults<EmployeeSalaryRange> result = mongoTemplate.aggregate(aggregation, Employee.class, EmployeeSalaryRange.class);
        EmployeeSalaryRange priceRange = result.getUniqueMappedResult();
        if (priceRange != null) {
            System.out.println("Min Price: " + priceRange.getMinPrice() + ", Max Price: " + priceRange.getMaxPrice());
        }
        return ResponseEntity.ok(priceRange);
    }

    @GetMapping("/employees/average-salary")
    public ResponseEntity<EmployeeAverageSalary> employeeSalaryAverage() {
        Aggregation aggregation = newAggregation(
                group().avg("salary").as("averageSalary")
        );

        AggregationResults<EmployeeAverageSalary> result = mongoTemplate.aggregate(aggregation, Employee.class, EmployeeAverageSalary.class);
        List<EmployeeAverageSalary> averageSalaries = result.getMappedResults();

        if (!averageSalaries.isEmpty()) {
            return ResponseEntity.ok(averageSalaries.get(0));
        }

        return ResponseEntity.ok(null);
    }

    @GetMapping("/employees/count")
    public ResponseEntity<EmployeeCount> employeeCount() {
        Aggregation aggregation = newAggregation(
                group().count().as("employeeCount")
        );

        AggregationResults<EmployeeCount> result = mongoTemplate.aggregate(aggregation, Employee.class, EmployeeCount.class);
        List<EmployeeCount> averageSalaries = result.getMappedResults();

        if (!averageSalaries.isEmpty()) {
            return ResponseEntity.ok(averageSalaries.get(0));
        }

        return ResponseEntity.ok(null);
    }

    @GetMapping("/services")
    public ResponseEntity<List<Service>> services() {
        List<Service> list = mongoTemplate.findAll(Service.class);
        System.out.println(list);
        return ResponseEntity.ok(list);
    }
    @GetMapping("/services/search")
    public ResponseEntity<List<Service>> serviceByName(@RequestParam String name) {
        BasicQuery query = new BasicQuery(String.format("{ name: {$regex: '%s', $options: 'i'} }", name));
        List<Service> list = mongoTemplate.find(query, Service.class);
        return ResponseEntity.ok(list);
    }
    @GetMapping("/services/{id}")
    public ResponseEntity<Service> serviceById(@PathVariable  String id) {
        Service list = mongoTemplate.findById(id, Service.class);
        return ResponseEntity.ok(list);
    }
    @PostMapping("/services/add")
    public ResponseEntity<String> addService(@RequestBody Service service) {
        mongoTemplate.save(service);
        return ResponseEntity.ok("Добавлено");
    }

    @PostMapping("/services/delete")
    public ResponseEntity<String> deleteService(@RequestBody Service service) {
        mongoTemplate.remove(service);
        return ResponseEntity.ok("Удалено");
    }

    @GetMapping("/entries")
    public ResponseEntity<List<Entry>> entries() {

        System.out.println("entries");
        List<Entry> list = mongoTemplate.findAll(Entry.class);
        return ResponseEntity.ok(list);
    }
    @GetMapping("/entries/search")
    public ResponseEntity<List<Entry>> entryByLastName(@RequestParam String lastName) {
        BasicQuery query = new BasicQuery(String.format("{ last_name: {$regex: '%s', $options: 'i'} }", lastName));
        List<Entry> list = mongoTemplate.find(query, Entry.class);
        return ResponseEntity.ok(list);
    }
    @GetMapping("/entries/{id}")
    public ResponseEntity<Entry> entryById(@PathVariable  String id) {

        System.out.println("entries");
        Entry list = mongoTemplate.findById(id, Entry.class);
        return ResponseEntity.ok(list);
    }
    @PostMapping("/entries/add")
    public ResponseEntity<String> addEntry(@RequestBody Entry entry) {

        System.out.println("entries");
        mongoTemplate.save(entry);
        return ResponseEntity.ok("Добавлено");
    }
    @PostMapping("/entries/delete")
    public ResponseEntity<String> deleteEntry(@RequestBody Entry entry) {

        System.out.println("entries");
        mongoTemplate.remove(entry);
        return ResponseEntity.ok("Удалено");
    }
}
