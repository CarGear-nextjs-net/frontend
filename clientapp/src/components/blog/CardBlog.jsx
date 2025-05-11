import {Badge, Card} from "react-bootstrap";
import {Calendar, Clock} from "react-bootstrap-icons";
import {formatDate} from "../../utils/format";
import React from "react";

export default function CardBlog({post}) {
    return (
        <Card className="h-100 shadow-sm border-0 transition-transform hover-scale">
            <div className="position-relative">
                <Card.Img
                    variant="top"
                    src={post.imageUrl}
                    alt={post.title}
                    style={{ height: "180px", objectFit: "cover" }}
                />
                <Badge
                    bg="primary"
                    className="position-absolute top-0 start-0 m-2 rounded-pill"
                >
                    {post.category}
                </Badge>
            </div>
            <Card.Body>
                <Card.Title className="h5 fw-bold mb-2">
                    <a href={`/blog/${post.slug}`} className="text-decoration-none text-dark stretched-link">
                        {post.title}
                    </a>
                </Card.Title>
                <Card.Text className="text-secondary small mb-3">
                    {post.description.length > 80
                        ? `${post.description.substring(0, 80)}...`
                        : post.description}
                </Card.Text>
                <div className="d-flex align-items-center text-secondary small">
                    <Calendar size={14} className="me-1" />
                    <span className="me-3">{formatDate(post.publishedDate)}</span>
                    <Clock size={14} className="me-1" />
                    <span>{post.readTime} phút đọc</span>
                </div>
            </Card.Body>
        </Card>
    )
}