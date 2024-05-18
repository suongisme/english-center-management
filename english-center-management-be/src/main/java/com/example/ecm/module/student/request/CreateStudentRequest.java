package com.example.ecm.module.student.request;

import com.example.ecm.module.student.StudentEntity;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class CreateStudentRequest {

    @NotBlank
    @Size(max = 255)
    private String firstName;

    @NotBlank
    @Size(max = 255)
    private String lastName;

    @NotNull
    private Date dob;

    @NotBlank
    @Email
    @Size(max = 255)
    private String email;

    @NotBlank
    @Size(max = 20)
    private String phone;

    @NotBlank
    @Size(max = 2000)
    private String address;

    @NotNull
    private Integer status;

    public StudentEntity toEntity() {
        StudentEntity student = new StudentEntity();
        student.setStatus(this.getStatus());
        student.setFirstName(this.getFirstName());
        student.setLastName(this.getLastName());
        student.setDob(this.getDob());
        student.setAddress(this.getAddress());
        student.setEmail(this.getEmail());
        student.setPhone(this.getPhone());
        return student;
    }

}
