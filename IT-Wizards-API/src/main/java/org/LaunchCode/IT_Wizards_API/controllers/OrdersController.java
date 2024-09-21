
package org.LaunchCode.IT_Wizards_API.controllers;

import org.LaunchCode.IT_Wizards_API.exceptions.*;
import org.LaunchCode.IT_Wizards_API.models.Address;
import org.LaunchCode.IT_Wizards_API.models.Orders;
import org.LaunchCode.IT_Wizards_API.models.User;
import org.LaunchCode.IT_Wizards_API.repository.AddressRepository;
import org.LaunchCode.IT_Wizards_API.services.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/orders")
public class OrdersController {

    private final OrdersService ordersService;
    private final AddressRepository addressRepository;

    @Autowired
    public OrdersController(OrdersService ordersService, AddressRepository addressRepository) {
        this.ordersService = ordersService;
        this.addressRepository = addressRepository;
    }

    @PostMapping("/{userId}")
    public ResponseEntity<Orders> createOrder(@PathVariable Long userId, @RequestBody Map<String, Long> request) {
        Long addressId = request.get("addressId");
        try {
            Address address = addressRepository.findById(addressId)
                    .orElseThrow(() -> new AddressNotFoundException(addressId));
            Orders order = ordersService.createOrder(userId, addressId);

            ordersService.moveCartItemsToOrder(userId, order);

            return ResponseEntity.ok(order);
        } catch (UserNotFoundException | AddressNotFoundException | CartNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (CartItemNotFoundException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Orders>> getUserOrders(@PathVariable Long userId) {
        List<Orders> orders = ordersService.getUserOrders(userId);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{userId}/{orderId}")
    public ResponseEntity<Orders> getOrderForUser(@PathVariable Long userId, @PathVariable Long orderId) {
        Orders order = ordersService.getOrderForUser(orderId, userId);
        return ResponseEntity.ok(order);
    }

    @PostMapping("/{userId}/reorder/{orderId}")
    public ResponseEntity<Void> reorderItems(@PathVariable Long userId, @PathVariable Long orderId) {
        try {
            ordersService.reorderItems(userId, orderId);
            return ResponseEntity.ok().build();
        } catch (OrderNotFoundException | CartNotFoundException | UserNotFoundException e) {
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

