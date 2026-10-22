package com.nike.store.service;

import com.nike.store.exception.ResourceNotFoundException;
import com.nike.store.model.Order;
import com.nike.store.model.OrderItem;
import com.nike.store.model.Product;
import com.nike.store.model.User;
import com.nike.store.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductService productService;
    private final AuthService authService;

    @Transactional
    public Order placeOrder(Order orderRequest) {
        User user = authService.getCurrentUser();
        
        Order order = Order.builder()
                .user(user)
                .firstName(orderRequest.getFirstName())
                .lastName(orderRequest.getLastName())
                .email(orderRequest.getEmail())
                .phone(orderRequest.getPhone())
                .address(orderRequest.getAddress())
                .city(orderRequest.getCity())
                .state(orderRequest.getState())
                .zip(orderRequest.getZip())
                .country(orderRequest.getCountry())
                .paymentMethod(orderRequest.getPaymentMethod())
                .subtotal(orderRequest.getSubtotal())
                .discount(orderRequest.getDiscount())
                .shippingCost(orderRequest.getShippingCost())
                .total(orderRequest.getTotal())
                .build();

        for (OrderItem itemRequest : orderRequest.getItems()) {
            Product product = productService.getProductById(itemRequest.getProduct().getId());
            OrderItem item = OrderItem.builder()
                    .order(order)
                    .product(product)
                    .quantity(itemRequest.getQuantity())
                    .selectedSize(itemRequest.getSelectedSize())
                    .selectedColor(itemRequest.getSelectedColor())
                    .price(product.getPrice()) // Store current price
                    .build();
            order.getItems().add(item);
        }

        return orderRepository.save(order);
    }

    public List<Order> getMyOrders() {
        User user = authService.getCurrentUser();
        return orderRepository.findByUserOrderByCreatedAtDesc(user);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));
    }

    public Order updateOrderStatus(Long id, Order.OrderStatus status) {
        Order order = getOrderById(id);
        order.setStatus(status);
        return orderRepository.save(order);
    }
}
