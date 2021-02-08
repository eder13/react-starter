package com.springreact.template.db;

import com.sun.istack.NotNull;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
@Table(name = "contact")
public class Contact {

    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private String firstName;
    private String lastName;
    private String email;
    private Date date;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    private User user;

    public Contact() {
    }

    public Contact(Long id, String firstName, String lastName, String email, Date date, User user) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.date = date;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long contact_id) {
        this.id = contact_id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    //public Long getFiUserId() {
    //    return fiUserId;
    //}

    //public void setFiUserId(Long fiUserId) {
    //    this.fiUserId = fiUserId;
    //}


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    //@Override
    //public String toString() {
    //    return "Contact{" +
    //            "contact_id=" + contact_id +
    //            ", firstName='" + firstName + '\'' +
    //            ", lastName='" + lastName + '\'' +
    //            ", email='" + email + '\'' +
    //            ", date=" + date +
    //            ", fiUserId=" + fiUserId +
    //            '}';
    //}


    //@Override
    //public String toString() {
    //    return "Contact{" +
    //            "contact_id=" + id +
    //            ", firstName='" + firstName + '\'' +
    //            ", lastName='" + lastName + '\'' +
    //            ", email='" + email + '\'' +
    //            ", date=" + date +
    //            ", user=" + user +
    //            '}';
    //}
}
