import Button from "@/components/ui/Button";
import FileSaver from "file-saver";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ChatDetail({ chatgptKey, chatHistory, inputValue }) {
  const isImageLink = (url) => {
    // Check for specific query parameters that indicate it's an image link
    return url.includes("rsct=image/png") || url.includes("rsct=image/jpeg");
  };

  const handleDownloadImage = (imageUrl) => {
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        console.log(blob);
        // const url = window.URL.createObjectURL(new Blob([blob]));
        // const link = document.createElement('a');
        // link.href = url;
        // link.setAttribute('download', 'image.jpg'); // You can customize the downloaded file name
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading image:", error);
      });
  };

  const handleViewImage = (imageUrl) => {
    window.open(imageUrl, "_blank");
  };

  // const downloadImage = async (url) => {
  // 	// setLoading(true)
  // 	let response = await fetch('designcraft/api/route', {
  // 		method: 'POST',
  // 		body: JSON.stringify({url}),
  // 		headers: {
  // 			'Content-type': 'application/json'
  // 		}
  // 	})

  // 	if (response.ok) {
  // 		const blob = await response.blob()
  // 		FileSaver.saveAs(blob, 'image.png')
  // 	} else {
  // 		console.error('some error')
  // 	}
  // 	// setLoading(false)
  // }

  const downloadImage = async (url) => {
    try {
      const response = await fetch(url, {
        method: "POST", // Adjust the method if needed
        mode: "cors", // Add this line to enable CORS
        body: JSON.stringify({ url }),
        headers: {
          "Content-Type": "application/json", // Set your custom Content-Type header
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        FileSaver.saveAs(blob, "image.png");
      } else {
        console.error("Error downloading image:", response.statusText);
      }
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <>
      {chatgptKey && chatHistory.length > 0 && (
        <div className="mt-6 px-4 sm:px-6 lg:px-8">
          <div className="min-h-96 overflow-y-auto p-4 bg-black-50 bg-transparent hidescrollbar">
            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
              {/* Loop through the chat history and reverse the order */}
              {chatHistory
                .slice()
                .reverse()
                .reduce((result, message, index, array) => {
                  // Combine consecutive user and AI messages into a single pair
                  if (index % 2 === 0) {
                    const userMessage = array[index];
                    const aiMessage = array[index + 1];

                    if (userMessage && aiMessage) {
                      result.push([userMessage, aiMessage]);
                    }
                  }
                  return result;
                }, [])
                .map((messagePair, index) => (
                  <div key={index} className="mb-2">
                    {messagePair.map((message, subIndex) => (
                      <div
                        key={subIndex}
                        className={`group relative ${
                          message.role === "user" ? "text-left" : "text-left"
                        }`}
                      >
                        {isImageLink(message.content) && (
                          <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80 relative">
                            <img
                              src={message.content}
                              alt={"PGPGPT"}
                              className="h-full w-full object-cover object-center"
                            />
                            {/* './nlogo.png' */}
                            <div className="absolute bottom-0 left-0 right-0 flex justify-around p-2 bg-black bg-opacity-50">
                              <Button
                                onClick={() => handleViewImage(message.content)}
                              >
                                View
                              </Button>
                              {/* <Button
                              onClick={() => downloadImage(message.content)}
                              //  onClick={() => handleDownloadImage(message.content)}
                               >Download</Button> */}
                            </div>
                          </div>
                        )}
                        {message.role === "user" && (
                          <div className="bg-white p-2 rounded-md text-center">
                            {isImageLink(message.content)
                              ? null
                              : message.content}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {!chatgptKey && (
        <h2 className="mt-6 items-center text-center sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 text-lg font-bold leading-7 text-red-600">
          Glass Gpt Is Not Activate for You
        </h2>
      )}
    </>
  );
}
