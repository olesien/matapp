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
    image,
    setImage,
}) {
    const [show, setShow] = useState(false);
    const toggleShow = () => {
        setShow((show) => !show);
    };
    const changeField = (e) => {
        onChange(e.target.value);
    };

    const handleFileChange = (img) => {
        if (!img.target.files.length) {
            return;
        }

        setImage(img.target.files[0]);
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
                                <Image
                                    src={value}
                                    style={{ maxWidth: "100%" }}
                                />
                                <FontAwesomeIcon
                                    icon={faEyeSlash}
                                    style={{ padding: 5 }}
                                    onClick={() => toggleShow()}
                                />
                            </div>
                            <Form.Control
                                type="file"
                                onChange={handleFileChange}
                            />
                            <Form.Text>
                                {image
                                    ? `${image.name} (${Math.round(
                                          image.size / 1024
                                      )} kB)`
                                    : "No photo selected"}
                            </Form.Text>
                        </div>
                    ) : (
                        <div className="imgContainer">
                            <Image src={value} style={{ maxWidth: "100%" }} />
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
