import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faGear } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";

export default function InputField({
    divClassName,
    value,
    onChange,
    type,
    title = false,
}) {
    const [show, setShow] = useState(false);
    const toggleShow = () => {
        setShow((show) => !show);
    };
    return (
        <Form.Group className={divClassName}>
            {title ? (
                <>
                    {/* Normal input type */}
                    <Button
                        variant="light"
                        style={{ marginBottom: 10 }}
                        onClick={() => toggleShow()}
                    >
                        {title}{" "}
                        <FontAwesomeIcon icon={show ? faEyeSlash : faGear} />
                    </Button>
                    {show ? (
                        <Form.Control type={type} placeholder={value} />
                    ) : (
                        <p>{value}</p>
                    )}
                </>
            ) : (
                <div>
                    {/* Special for headings etc */}
                    {show ? (
                        <div>
                            <Form.Control type={type} placeholder={value} />
                            <FontAwesomeIcon
                                onClick={() => toggleShow()}
                                icon={faEyeSlash}
                            />
                        </div>
                    ) : (
                        <p onClick={() => toggleShow()}>
                            {value} <FontAwesomeIcon icon={faGear} />
                        </p>
                    )}
                </div>
            )}
        </Form.Group>
    );
}
