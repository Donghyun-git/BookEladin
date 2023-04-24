function execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function (data) {
            var addr = "";
            var extraAddr = "";

            if (data.userSelectedType === "R") {
                addr = data.roadAddress;
            } else {
                addr = data.jibunAddress;
            }

            if (data.userSelectedType === "R") {
                if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
                    extraAddr += data.bname;
                }
                if (data.buildingName !== "" && data.apartment === "Y") {
                    extraAddr +=
                        extraAddr !== ""
                            ? ", " + data.buildingName
                            : data.buildingName;
                }
                if (extraAddr !== "") {
                    extraAddr = " (" + extraAddr + ")";
                }
                document.getElementById("extraAddress").value = extraAddr;
            } else {
                document.getElementById("extraAddress").value = "";
            }

            document.getElementById("postcode").value = data.zonecode;
            document.getElementById("address1").value = addr;
            document.getElementById("address2").focus();
        },
    }).open();
}

document
    .getElementById("search-btn")
    .addEventListener("click", execDaumPostcode);
