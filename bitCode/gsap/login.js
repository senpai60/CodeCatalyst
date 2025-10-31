function homePage() {
  let tl = gsap.timeline();

  tl.from(".card-inner-first .text h1", {
    x: -300,
    opacity: 0,
    duration: 0.8,
  });

  tl.from(
    ".card-inner-first .text p",
    {
      x: -100,
      opacity: 0,
      duration: 0.7,
    },
    "-=0.16"
  );

  var tl2 = gsap.timeline();

  gsap.from(".card-inner-first .btn button", {
    y: 100,
    opacity: 0,
    duration: 0.6,
    stagger: 0.21,
    scale: 0.8,
  });

  tl2.from(".card-inner-second h2", {
    opacity: 0,
    duration: 0.85,
    scale: 0.2,
    // y: -50
  });

  tl2.to(".card-inner-second h2", {
    y: -20,
    repeat: -1,
    yoyo: true,
    delay: 0.9,
  });

  let tl3 = gsap.timeline();

  tl3.from(".card-inner-second .socials button",{
    opacity:0,
    y:200,
    duration:1
  })

  tl3.from(".card-inner-second .field",{
    opacity:0,
    y:200,
    stagger:0.2,
    duration:0.9
  })

  tl3.from(".card-inner-second .field label",{
    opacity:0,
    y:200,
    duration:0.6,
    stagger:0.2
  }, "-=0.45")


  tl3.from(".login-btn",{
    opacity:0.7,
    repeat:-1,
    yoyo: true,
    duration:0.8,
    ease: "none"
  }, "-=2")

}

homePage();
