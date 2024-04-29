package backend.bookmarks;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
    info = @Info(
           contact = @Contact(
                   name="František Boura",
                   email="boura.frantisek01@gmail.com"
           ),
           description = "Bookmarks backend documentation",
           title = "Bookmarks backend documentation"
    ),
    servers = {
        @Server(
            description = "Localhost",
            url = "http://localhost:8080"
        )
    }
)
public class OpenApiConfig {
}
