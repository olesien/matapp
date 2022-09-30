import React from "react";
import { useState } from "react";
import Image from "react-bootstrap/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faGear } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";

export default function InputField({
    divClassName,
    value,
    onChange,
    type,
    title = false,
    isTitle = false,
    isImage = false,
}) {
    const [show, setShow] = useState(false);
    const toggleShow = () => {
        setShow((show) => !show);
    };
    const changeField = (e) => {
        onChange(e.target.value);
    };
    return (
        <Form.Group className={divClassName}>
            {title ? (
                <>
                    {/* Normal input type */}
                    <h4
                        style={{ marginBottom: 10 }}
                        onClick={() => toggleShow()}
                    >
                        {title}{" "}
                        <FontAwesomeIcon icon={show ? faEyeSlash : faGear} />
                    </h4>
                    {show ? (
                        <Form.Control
                            type={type}
                            value={value}
                            onChange={changeField}
                        />
                    ) : (
                        <p>{value}</p>
                    )}
                </>
            ) : isImage ? (
                <div>
                    {show ? (
                        <div>
                            <div className="imgContainer">
                                {" "}
                                <Image src={value} />
                                <FontAwesomeIcon
                                    icon={faEyeSlash}
                                    style={{ padding: 5 }}
                                    onClick={() => toggleShow()}
                                />
                            </div>
                            <Form.Control
                                type={type}
                                value={value}
                                onChange={changeField}
                            />
                        </div>
                    ) : (
                        <div className="imgContainer">
                            <Image src={value} />
                            <FontAwesomeIcon
                                icon={faGear}
                                style={{ padding: 5 }}
                                onClick={() => toggleShow()}
                            />
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    {/* Special for headings etc */}
                    {show ? (
                        <div>
                            <Form.Control
                                type={type}
                                value={value}
                                onChange={changeField}
                            />
                            <FontAwesomeIcon
                                onClick={() => toggleShow()}
                                icon={faEyeSlash}
                                data-testid="close-name"
                            />
                        </div>
                    ) : (
                        <>
                            {isTitle ? (
                                <h2 onClick={() => toggleShow()}>
                                    {value} <FontAwesomeIcon icon={faGear} />
                                </h2>
                            ) : (
                                <p onClick={() => toggleShow()}>
                                    {value} <FontAwesomeIcon icon={faGear} />
                                </p>
                            )}
                        </>
                    )}
                </div>
            )}
        </Form.Group>
    );
}
