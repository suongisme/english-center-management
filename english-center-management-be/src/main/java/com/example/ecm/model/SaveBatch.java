package com.example.ecm.model;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

@RequiredArgsConstructor
public class SaveBatch<T> implements BatchPreparedStatementSetter {

    private final List<T> data;
    private final ParamSetter<T> setter;

    @Override
    public void setValues(PreparedStatement ps, int i) throws SQLException {
        final T data = this.data.get(i);
        this.setter.set(ps, data);
    }

    @Override
    public int getBatchSize() {
        return this.data.size();
    }

    @FunctionalInterface
    public interface ParamSetter<T> {
        void set(PreparedStatement ps, T data) throws SQLException;
    }
}
