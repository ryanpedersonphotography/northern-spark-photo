---
type: PageLayout
title: Home
colors: colors-a
backgroundImage:
  type: BackgroundImage
  url: /images/bg1.jpg
  backgroundSize: cover
  backgroundPosition: center
  backgroundRepeat: no-repeat
  opacity: 75
sections:
  - elementId: ''
    colors: colors-a
    backgroundSize: full
    title: 'Northern Spark Photo: Brainerd Lakes Area Senior Grad Photography'
    subtitle: >-
      We are a one of the top photo studios based out of the Brainerd Lakes
      Area.  We've been doing this a long time and love what we do.
    styles:
      self:
        height: auto
        width: wide
        margin:
          - mt-0
          - mb-0
          - ml-0
          - mr-0
        padding:
          - pt-36
          - pb-48
          - pl-4
          - pr-4
        alignItems: center
        justifyContent: center
        flexDirection: row-reverse
      title:
        textAlign: left
      subtitle:
        textAlign: left
      text:
        textAlign: left
      actions:
        justifyContent: flex-start
    type: HeroSection
    actions:
      - type: Button
        label: Now Booking For 2025
        altText: ''
        url: /contact
        showIcon: false
        icon: arrowRight
        iconPosition: right
        style: primary
        elementId: ''
    media:
      type: ImageBlock
      url: /images/7Y5A0455-2.jpg
      altText: senior grad photography in brained mn
      caption: Savannah
      elementId: ''
    text: ''
  - type: ContactSection
    colors: colors-f
    backgroundSize: full
    title: Reserve Your Date Now!
    form:
      type: FormBlock
      elementId: sign-up-form
      fields:
        - name: name
          label: Name
          hideLabel: true
          placeholder: First and Last Name
          isRequired: true
          width: 1/2
          type: TextFormControl
        - name: email
          label: Email
          hideLabel: true
          placeholder: Email
          isRequired: true
          width: 1/2
          type: EmailFormControl
        - type: TextFormControl
          name: dateDesire
          label: Name
          hideLabel: false
          placeholder: Your name
          width: full
          isRequired: false
      submitLabel: "Submit \U0001F680"
      styles:
        submitLabel:
          textAlign: center
    styles:
      self:
        height: auto
        width: narrow
        margin:
          - mt-0
          - mb-0
          - ml-0
          - mr-0
        padding:
          - pt-24
          - pb-24
          - pr-4
          - pl-4
        alignItems: center
        justifyContent: center
        flexDirection: row
      title:
        textAlign: left
      text:
        textAlign: left
---
