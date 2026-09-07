<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Fibonacci Number Calculator</title>
</head>
<body>

<div class="container">
    <h1>${message}</h1>

    <form:form method="post" action="addFibonacci.html" modelAttribute="fibonacci">
        <div class="form-group">
            <form:label path="position">Enter position (non-negative number):</form:label>
            <form:input path="position" type="number" min="0" />
        </div>
        <br>
        <input type="submit" value="Calculate"/>
    </form:form>
</div>

</body>
</html>
