import React from "react";
import { Result, Button } from "antd";
import Loader from "../../components/Loader/Loader";
import { addMember, getHouseDetails } from "../../utils/houseQueries";
import { useNavigate } from "react-router-dom";
const urlParams = new URLSearchParams(window.location.search);
const houseId = urlParams.get("houseId");
const email = urlParams.get("email");

function Invite() {
    const [data, setData] = React.useState({
        status: "",
        title: "",
        subTitle: "",
    });
    const [isLoading, setIsLoading] = React.useState(true);
    const navigate = useNavigate();

    React.useEffect(() => {
        async function acceptInvite() {
            const data = await addMember(houseId, email);
            setData({
                status: "success",
                title: `Weclome to ${data}!`,
                subTitle:
                    "If you have a QRing account, you can access this house from your dashboard.",
            });
            setIsLoading(false);
        }
        acceptInvite().catch((err) => {
            switch (err.message) {
                case "User does not exist":
                    setData({
                        status: "info",
                        title: "Join QRing to access this house",
                        subTitle: "Please register to access this house.",
                    });
                    break;
                case "User already exists in house":
                    setData({
                        status: "error",
                        title: "You are already a member of this house!",
                        subTitle: "Please login to access this house.",
                    });
                    break;
                default:
                    setData({
                        status: "error",
                        title: "Something went wrong",
                        subTitle: "Please try again later.",
                    });
                    break;
            }
            setIsLoading(false);
        });
    }, []);

    return (
        <div
            style={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {isLoading ? (
                <Loader size={48} />
            ) : (
                <Result
                    status={data.status}
                    title={data.title}
                    subTitle={data.subTitle}
                    extra={[
                        data.status != "info" && (
                            <Button
                                type="primary"
                                key="login"
                                onClick={() => navigate("/")}
                            >
                                Login
                            </Button>
                        ),
                        data.status == "info" && (
                            <Button
                                onClick={() =>
                                    navigate("/register", {
                                        state: { email, houseId },
                                    })
                                }
                                key="register"
                            >
                                Register
                            </Button>
                        ),
                    ]}
                />
            )}
        </div>
    );
}

export default Invite;
