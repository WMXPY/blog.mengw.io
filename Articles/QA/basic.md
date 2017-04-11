# Basic of QA

### Standard

-   Statement coverage

Assume we have a source code

    PROCEDURE M(VAR A，B，X：REAL)；  
    BEGIN
    IF(A>1) AND (B=0)  THENX:=X/A；
    IF(A=2)OR (X>1)  THENX:=X+1；
    END. 
