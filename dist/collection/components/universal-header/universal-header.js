import { Host, h } from "@stencil/core";
import { css } from 'emotion';
import Fragment from 'stencil-fragment';
import axios from 'axios';
import { GlobalStyleSheet } from '../../shared/styles';
import { COLORS, TYPOGRAPHY, SPACING, MEDIA_QUERIES, Margins, LargeScreen, SmallScreen, LINK_STYLES, Z_SPACE, } from '../../shared/styles';
export class UniversalHeader {
    constructor() {
        this.isOpen = false;
        this.isLoaded = false;
        this.data = {};
        this.error = false;
    }
    transformData(data) {
        return {
            primary: data.filter(item => item.level === "1"),
            secondary: data.filter(item => item.level === "2")
        };
    }
    handleClick(event) {
        // isOpen = ! isOpen;
        console.log("AHOY AHOY CLICK EVENT", event);
        this.isOpen = !this.isOpen;
    }
    setError(value) {
        this.error = value;
    }
    setData(value) {
        console.log("AHOY DATA", value);
        this.data = Object.assign(Object.assign({}, this.data), value);
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
        if (this_.isOpen === undefined) {
            this_.isOpen = true;
        }
        if (!this.isLoaded) {
            axios.get("https://cms.dev.lib.umich.edu/api/universalheader")
                .then(result => this_.setData(this_.transformData(result.data)))
                .catch(error => this_.setError(true));
        }
        linkss.special = css(LINK_STYLES['special']);
        linkss.listStrong = css(LINK_STYLES['links-strong']);
        styles.linkLink = css(Object.assign(LINK_STYLES['list-strong'], {
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
        }));
        styles.container = css({
            background: COLORS.blue[100],
            width: '100%'
        });
        styles.content = css({
            display: 'flex',
            justifyContent: 'space-between',
            padding: `${SPACING['2XS']} 0`
        });
        styles.headerSpan = css(Object.assign(Object.assign({}, TYPOGRAPHY['3XS']), { color: COLORS.neutral[300] }));
        styles.sitesButton = css(Object.assign(Object.assign({}, LINK_STYLES['special']), { ':hover': {
                'span': LINK_STYLES['special'][':hover']
            } }));
        styles.sitesContainer = css({
            display: 'inline-block',
            position: 'relative'
        });
        styles.overlay = css(Object.assign(Object.assign({ background: 'white', zIndex: '10', position: `absolute`, left: `auto`, right: `0`, marginLeft: SPACING['XL'], marginBottom: SPACING['L'], padding: '0', borderRight: '0', width: '20rem', marginRight: `-${SPACING['M']}` }, Z_SPACE[8]), { [MEDIA_QUERIES.LARGESCREEN]: {
                marginRight: '0',
                padding: SPACING['XL'],
                width: `862px`,
                maxWidth: `calc(100vw - ${SPACING['2XL']} * 2)`,
            } }));
        styles.sitesLede = css({
            display: 'none',
            [MEDIA_QUERIES.LARGESCREEN]: Object.assign(Object.assign({ display: 'block' }, TYPOGRAPHY['L']), { padding: 0, marginBottom: SPACING['L'] })
        });
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
        });
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
        });
        styles.linkDescription = css({
            display: 'none',
            color: COLORS.neutral['300'],
            [MEDIA_QUERIES.LARGESCREEN]: {
                display: 'block'
            }
        });
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
        });
        GlobalStyleSheet();
        function HeaderContainer(props, children) {
            console.log("AHOY ARGUMENTS", arguments);
            return (h("header", { class: styles.container, "aria-label": "WHAT IS EVEN HAPPENING?" }, children));
        }
        function HeaderContent() {
            return (h("div", { class: styles.content }, arguments[1]));
        }
        function HeaderMargins() {
            return (h("div", { class: Margins }, arguments[1]));
        }
        function UMichLibraryLink() {
            //LINK_STYLES
            return (h(Fragment, null,
                h("div", { class: LargeScreen },
                    h("a", { class: linkss.special, href: "https://www.lib.umich.edu/" }, "University of Michigan Library")),
                h("div", { class: SmallScreen },
                    h("a", { class: linkss.special, href: "https://www.lib.umich.edu/" },
                        h("abbr", { title: "University of Michigan" }, "U-M"),
                        " Library"))));
        }
        function Icon(props, children) {
            return (h("span", Object.assign({}, props)));
        }
        function HeaderText(props, children) {
            return (h("span", { class: styles.headerSpan }, children));
        }
        //             
        //  
        function SitesButton(props, children) {
            return (h("button", Object.assign({ id: "activate-sites-button", class: styles.sitesButton }, props, { onClick: this_.handleClick.bind(this_) }), children));
        }
        function SitesContainer(props, children) {
            return (h("div", { class: styles.sitesContainer }, children));
        }
        const SitesLede = (props, children) => [
            h("p", Object.assign({ class: styles.sitesLede }, props), children)
        ];
        const LinksContainer = (props, children) => [
            h("div", { class: styles.linksContainer }, children)
        ];
        const LinkItem = (props, children) => [
            h("li", Object.assign({ class: styles.linkItem }, props), children)
        ];
        const Link = (props, children) => [
            h("a", { class: Object.assign(Object.assign({}, LINK_STYLES[props.kind]), props['css']), href: props.href }, children)
        ];
        const LinkDescription = (props, children) => [
            h("p", { class: styles.linkDescription }, children)
        ];
        const SiteLinks = (props, children) => [
            h("ul", null, props.data.map((d, i) => (h(LinkItem, { key: i + d.title },
                h(Link, { kind: "list-medium", href: d.link, css: {
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
                    } },
                    h("span", null, d.title)),
                d.description && (h(LinkDescription, null, d.description))))))
        ];
        const LoadingContainer = (props, children) => [
            h("div", { class: styles.loadingContainer }, children)
        ];
        const Loading = (props, children) => [
            h("pre", null, "LOADING!")
        ];
        const Overlay = (props, children) => [
            h("div", { class: styles.overlay }, children)
        ];
        function Sites() {
            // this is where all the voodoo goes
            console.log("AHOY", this_.data);
            return (h(SitesContainer, null,
                h(SitesButton, { "aria-expanded": this_.isOpen },
                    h(HeaderText, null,
                        h("span", null, "Explore"))),
                this_.isOpen && (h(Overlay, null,
                    h(SitesLede, { "aria-role": "heading" },
                        h("span", null, "Explore what the library has to offer.")),
                    h(Fragment, null, this_.isLoaded ? (h(LinksContainer, null,
                        h(SiteLinks, { data: this_.data.primary }),
                        h(SiteLinks, { data: this_.data.secondary }))) : (h(LoadingContainer, null,
                        h(Loading, null))))))));
        }
        // return (
        //   <header class={styles.container} aria-label="View our other U-M Library sites">
        //     <UMichLibraryLink />
        //   </header>
        // );
        return (h(HeaderContainer, { "aria-label": "View our other U-M Library sites" },
            h(HeaderMargins, null,
                h(HeaderContent, null,
                    h(UMichLibraryLink, null),
                    h(Sites, null)))));
    }
    static get is() { return "umichlib-universal-header"; }
    static get originalStyleUrls() { return {
        "$": ["universal-header.css"]
    }; }
    static get styleUrls() { return {
        "$": ["universal-header.css"]
    }; }
    static get properties() { return {
        "isOpen": {
            "type": "boolean",
            "mutable": true,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "is-open",
            "reflect": false,
            "defaultValue": "false"
        },
        "isLoaded": {
            "type": "boolean",
            "mutable": true,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "is-loaded",
            "reflect": false,
            "defaultValue": "false"
        },
        "data": {
            "type": "any",
            "mutable": true,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "data",
            "reflect": false,
            "defaultValue": "{}"
        },
        "error": {
            "type": "boolean",
            "mutable": true,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "error",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get elementRef() { return "el"; }
}
