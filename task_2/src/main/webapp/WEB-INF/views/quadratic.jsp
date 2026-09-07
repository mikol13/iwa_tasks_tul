<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Quadratic equation</title>
</head>
<body>

<div class="container">
    <h1>${message}</h1>

    <form:form method="post" action="addQuadratic.html" modelAttribute="quadratic">
        <div class="form-group">
            <form:label path="a">Coefficient a:</form:label>
            <form:input path="a" type="number" step="0.01" />
        </div>
        <br>
        <div class="form-group">
            <form:label path="b">Coefficient b:</form:label>
            <form:input path="b" type="number" step="0.01" />
        </div>
        <br>
        <div class="form-group">
            <form:label path="c">Coefficient c:</form:label>
            <form:input path="c" type="number" step="0.01" />
        </div>
        <br>
        <input type="submit" value="Calculate"/>
    </form:form>
</div>

</body>
</html>
