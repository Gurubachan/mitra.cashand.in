function openATM() {
  isuSDK("#demoCode").open({
    closeButton: true,
    title: "MATM SDK",
    className: "zoom-and-spin",
    encryptedData:
      "hby%2FL%2FKTDcQLR2NwHH0boLcuYNScqCZyVHd1kReA%2FOyjyO212%2FcWWrce%2Fp9gpoqNGcW%2BzoapgkXzdnLo7z3friYdKsvBGjO06jH9ioqUDuY%3D",
    client_txnId: "4881",
    retailerUserName: "aepsTestR",
  });
}
