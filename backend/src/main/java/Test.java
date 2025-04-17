import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public class Test {
    public static void main(String[] args) {
        List<Integer> test = Arrays.asList(1,2,3,4,5);
        Integer test2 = test.stream().map(n-> n*2).findAny().orElseThrow(()-> new RuntimeException("hi"));
        System.out.println(test2);
    }
}
