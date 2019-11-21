import { FunctionalComponent, Element, Component, Prop, Host, h } from '@stencil/core';
import { css } from 'emotion';
import Fragment from 'stencil-fragment'

import axios from 'axios'

import { GlobalStyleSheet } from '../../shared/styles';

import {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  MEDIA_QUERIES,
  Margins,
  LargeScreen,
  SmallScreen,
  LINK_STYLES,
  Z_SPACE,
} from '../../shared/styles'

@Component({
  tag: 'umichlib-universal-header',
  styleUrl: 'universal-header.css',
  shadow: false
})
export class UniversalHeader {

  @Prop({ mutable: true }) isOpen: boolean = false;
  
  @Prop({ mutable: true }) isLoaded: boolean = false;
  
  @Prop({ mutable: true }) data: any = {};
  @Prop({ mutable: true }) error: boolean = false;

  @Element() el: HTMLElement;

  transformData(data) {
    return {
      primary: data.filter(item => item.level === "1"),
      secondary: data.filter(item => item.level === "2")
    };
  }

  handleClick(event) {
    // isOpen = ! isOpen;
    console.log("AHOY AHOY CLICK EVENT", event);
    this.isOpen = ! this.isOpen;
  }

  setError(value) {
    this.error = value;
  }

  setData(value){
    console.log("AHOY DATA", value);
    this.data = { ...this.data, ...value };
    this.isLoaded = true;
  }

  componentDidLoad() {
    var button = this.el.querySelector('#activate-sites-button');
    console.log("AHOY AHOY LOADED", button);
  }

  render() {

    let this_ = this;

    let container;

    let items;

    let styles = { linkLink: null, container: null, content: null, headerSpan: null, sitesButton: null, sitesContainer: null, overlay: null, sitesLede: null, linksContainer: null, linkItem: null, linkDescription: null, loadingContainer: null };
    let linkss = { special: null, listStrong: null };

    if ( this_.isOpen === undefined ) { this_.isOpen = true; }

    if ( ! this.isLoaded ) {
      axios.get("https://cms.dev.lib.umich.edu/api/universalheader")
        .then(result => this_.setData(this_.transformData(result.data)))
        .catch(error => this_.setError(true))
    }

    linkss.special = css(LINK_STYLES['special']);
    linkss.listStrong = css(LINK_STYLES['links-strong']);

    styles.linkLink = css(
      Object.assign(
        LINK_STYLES['list-strong'],
        {
          display: 'block',
          padding: SPACING['M'],
          ':hover': {
            boxShadow: 'none'
          },
          ':hover span': LINK_STYLES['list-strong'][':hover'],
          [MEDIA_QUERIES.LARGESCREEN]: {
            display: 'inline',
            padding: '0'
          }
        }
      )
    )

    styles.container = css({
      background: COLORS.blue[100],
      width: '100%'
    });

    styles.content = css({
      display: 'flex',
      justifyContent: 'space-between',
      padding: `${SPACING['2XS']} 0`
    });

    styles.headerSpan = css({
      ...TYPOGRAPHY['3XS'],
      color: COLORS.neutral[300]
    })

    styles.sitesButton = css({
      ...LINK_STYLES['special'],
      ':hover': {
        'span': LINK_STYLES['special'][':hover']
      }
    })

    styles.sitesContainer = css({
      display: 'inline-block',
      position: 'relative'
    })

    styles.overlay = css({
      background: 'white',
      zIndex: '10',
      position: `absolute`,
      left: `auto`,
      right: `0`,
      marginLeft: SPACING['XL'],
      marginBottom: SPACING['L'],
      padding: '0',
      borderRight: '0',
      width: '20rem',
      marginRight: `-${SPACING['M']}`,
      ...Z_SPACE[8],
      [MEDIA_QUERIES.LARGESCREEN]: {
        marginRight: '0',
        padding: SPACING['XL'],
        width: `862px`,
        maxWidth: `calc(100vw - ${SPACING['2XL']} * 2)`, // less the margins
      }
    })

    styles.sitesLede = css({
      display: 'none',
      [MEDIA_QUERIES.LARGESCREEN]: {
        display: 'block',
        ...TYPOGRAPHY['L'],
        padding: 0,
        marginBottom: SPACING['L'],
      }
    })

    styles.linksContainer = css({
      [MEDIA_QUERIES.LARGESCREEN]: {
        'ul:first-of-type': {
          marginBottom: SPACING['M']
        },
        display: 'flex',
        justifyContent: 'space-between',
        'ul:last-of-type': {
          minWidth: '16rem',
          margin: '0',
          marginLeft: SPACING['XL'],
          paddingLeft: SPACING['XL'],
          borderLeft: `solid 1px ${COLORS.neutral[100]}`,
          'li': {
            marginBottom: SPACING['S'],
          }
        }
      },
      'ul:last-of-type li:last-of-type': {
        border: 'none'
      }
    })

    styles.linkItem = css({
      borderBottom: `solid 1px ${COLORS.neutral[100]}`,
      [MEDIA_QUERIES.LARGESCREEN]: {
        border: 'none',
        position: 'relative',
        maxWidth: '32rem',
        ':not(:last-child)': {
          marginBottom: '1rem'
        }
      }
    })

    styles.linkDescription = css({
      display: 'none',
      color: COLORS.neutral['300'],
      [MEDIA_QUERIES.LARGESCREEN]: {
        display: 'block'
      }
    })

    styles.loadingContainer = css({
      borderBottom: `solid 1px ${COLORS.neutral[100]}`,
      [MEDIA_QUERIES.LARGESCREEN]: {
        border: 'none',
        position: 'relative',
        maxWidth: '32rem',
        ':not(:last-child)': {
          marginBottom: '1rem'
        }
      }
    })

    GlobalStyleSheet();

    function HeaderContainer(props, children) {
      console.log("AHOY ARGUMENTS", arguments);
      return (
        <header class={styles.container} aria-label="WHAT IS EVEN HAPPENING?">
        {children}
        </header>
      )
    }

    function HeaderContent() {
      return (
        <div class={styles.content}>
        {arguments[1]}
        </div>
      )
    }

    function HeaderMargins() {
      return (
        <div class={Margins}>
        {arguments[1]}
        </div>
      )
    }

    function UMichLibraryLink() {
      //LINK_STYLES

      return (
        <Fragment>
            <div class={LargeScreen}>
              <a class={linkss.special} href="https://www.lib.umich.edu/">University of Michigan Library</a>
            </div>
            <div class={SmallScreen}>
              <a class={linkss.special} href="https://www.lib.umich.edu/"><abbr title="University of Michigan">U-M</abbr> Library</a>
            </div>
        </Fragment>        
      );
    }

    function Icon(props, children) {
      return (<span {...props}></span>)
    }

    function HeaderText(props, children) {
      return (
        <span class={styles.headerSpan}>{children}</span>
      )
    }

    //             
    //  
    function SitesButton(props, children) {
      return (
        <button id="activate-sites-button" class={styles.sitesButton} {...props} onClick={this_.handleClick.bind(this_)}
>{children}</button>
      )
    }

    function SitesContainer(props, children) {
      return (
        <div class={styles.sitesContainer}>
          {children}
        </div>
      )
    }

    const SitesLede = ( props, children ) => [
      <p class={styles.sitesLede} {...props}>{children}</p>
    ];

    const LinksContainer = ( props, children ) => [
      <div class={styles.linksContainer}>
        {children}
      </div>
    ];

    const LinkItem = ( props, children ) => [
      <li class={styles.linkItem} {...props}>
        {children}
      </li>
    ]

    const Link = ( props, children ) => [
      <a class={{...LINK_STYLES[props.kind], ...props['css']}} href={props.href}>
        {children}
      </a>
    ]

    const LinkDescription = ( props, children ) => [
      <p class={styles.linkDescription}>
        {children}
      </p>
    ]

    const SiteLinks = ( props, children ) => [
      <ul>
        {props.data.map((d, i) => (
          <LinkItem key={i + d.title}>
            <Link kind="list-medium" href={d.link} css={{
              display: 'block',
              padding: SPACING['M'],
              ':hover': {
                boxShadow: 'none'
              },
              ':hover span': LINK_STYLES['list-medium'][':hover'],
              [MEDIA_QUERIES.LARGESCREEN]: {
                display: 'inline',
                padding: '0'
              }
            }}>
              <span>{d.title}</span>
            </Link>
            {d.description && (
              <LinkDescription>
                {d.description}
              </LinkDescription>
            )}
          </LinkItem>
        ))}
      </ul>
    ]

    const LoadingContainer = ( props, children ) => [
      <div class={styles.loadingContainer}>
        {children}
      </div>
    ]

    const Loading = ( props, children ) => [
      <pre>LOADING!</pre>
    ]

    const Overlay = ( props, children ) => [
      <div class={styles.overlay}>
        {children}
      </div>
    ]

    function Sites() {
      // this is where all the voodoo goes
      console.log("AHOY", this_.data);
      return (
        <SitesContainer>
          <SitesButton
            aria-expanded={this_.isOpen}
          ><HeaderText><span>Explore</span></HeaderText></SitesButton>
          {this_.isOpen && (
            <Overlay>
              <SitesLede aria-role="heading"><span>Explore what the library has to offer.</span></SitesLede>
              <Fragment>
                {this_.isLoaded ? (
                  <LinksContainer>
                    <SiteLinks data={this_.data.primary} />
                    <SiteLinks data={this_.data.secondary} />
                  </LinksContainer>
                ) : (
                  <LoadingContainer>
                    <Loading />
                  </LoadingContainer>
                )}
              </Fragment>
            </Overlay>
          )}
        </SitesContainer>
      );
    }

    // return (
    //   <header class={styles.container} aria-label="View our other U-M Library sites">
    //     <UMichLibraryLink />
    //   </header>
    // );

    return (
      <HeaderContainer
        aria-label="View our other U-M Library sites"
      >
        <HeaderMargins>
          <HeaderContent>
            <UMichLibraryLink />
            <Sites />
          </HeaderContent>
        </HeaderMargins>
      </HeaderContainer>
    )
  }

}
