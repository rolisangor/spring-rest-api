package dev.devdemo.controller;

import dev.devdemo.entity.User;
import dev.devdemo.service.RoleService;
import dev.devdemo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/")
public class HomeController {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public HomeController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping
    String getHomePage() {
        return "redirect:/login";
    }

    @GetMapping("/login")
    String getLoginPage() {
        return "login";
    }

    @GetMapping("/admin")
    String getAdminPage(Model model, HttpServletRequest http) {

        Iterable<User> users = userService.findAllUsers();
        User currentUser = (User) userService.findUserByUsername(http.getRemoteUser());

        model.addAttribute("usersList", users);
        model.addAttribute("currentUser", currentUser);
        model.addAttribute("user", new User());
        model.addAttribute("roleList", roleService.findAll());
        return "admin";
    }

    @PostMapping("/save")
    String saveUser(@ModelAttribute User user) {
        userService.save(user);
        return "redirect:/admin";
    }

    @PostMapping("/delete")
    String deleteUser(@ModelAttribute User user) {
        userService.deleteUserById(user.getId());
        return "redirect:/admin";
    }

    @GetMapping("/user")
    String getUserPage(Model model, HttpServletRequest http) {
        User currentUser = (User) userService.findUserByUsername(http.getRemoteUser());
        model.addAttribute("currentUser", currentUser);
        return "user";
    }

    @GetMapping("/redirectUser")
    String getRedirectPage(HttpServletRequest httpRequest) {
        if (userService.findUserByUsername(httpRequest
                .getUserPrincipal()
                .getName())
                .getAuthorities()
                .stream()
                .anyMatch(r -> r.getAuthority().equals("ADMIN"))) {

            return "redirect:/admin";
        }

        return "redirect:/user";
    }
}
