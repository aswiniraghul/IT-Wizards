package org.LaunchCode.IT_Wizards_API.models;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
public class ItemCategory extends AbstractEntity{

    //Fields
    @NotNull
    @Size(max=20)
    private String name;

    @OneToMany(mappedBy = "itemCategory")
    private final List<Item> items = new ArrayList<>();

    //Constructors
    public ItemCategory(String name){
        this.name=name;
    }

    public ItemCategory(){}

    //Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    //Methods

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        ItemCategory that = (ItemCategory) o;
        return Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), name);
    }

    @Override
    public String toString() {
        return name;
    }
}
