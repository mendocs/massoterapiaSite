import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Subscription } from 'rxjs';
import { blogs } from 'src/app/public-blog/models/blogs.model';
import { BaseFormComponent } from 'src/app/shared-kernel/forms/core/base-form.component';
import { UtilsService } from 'src/app/shared-kernel/tools/utils.service';
import { AdminBlogService } from '../services/admin-blog.service';

@Component({
  selector: 'app-blog-register',
  templateUrl: './blog-register.component.html',
  styleUrls: ['./blog-register.component.scss']
})
export class BlogRegisterComponent extends BaseFormComponent implements OnInit  {

  blogsRegister : blogs;
  text_Content : string;
  ImagemAddressAuxText: string;
  isNew : boolean = false;
  SavedSuccess: boolean = false;
  saveTime : string;
  savedData : number = 0;
  isLoadingPage : boolean = true;


  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    //uploadUrl: 'v1/image',
    //uploadWithCredentials: false,
    sanitize: false,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['insertImage'],
      ['insertImage']
    ]
  };


  parameterIdObserver = {
    next: (params) => this.getBlogRegister(params["key"] ),
    error: err => this.getError(err),
    complete: () => {},
    };

  blogsFile = {
		next: (_blog : blogs) => this.populateBlogs(_blog),
		error: err => this.getError(err),
		complete: () => {},
	  };

  blogsSaved = {
    next: (_blog : blogs) => this.savedBlogs(_blog),
    error: err => this.getError(err),
    complete: () => {},
    };

  blogsUpdated = {
    next: (result => this.updatedBlogs(result)),
    error: err => this.getError(err),
    complete: () => {},
    };

  getBlogByKeySubscription$ : Subscription;
  routeparamsSubscription$ : Subscription;
  createBlogSubscription$ : Subscription;
  updateBlogSubscription$ : Subscription;

    constructor(private _AdminBlogService: AdminBlogService,
                private route: ActivatedRoute,
                private router: Router,
                public formBuilder: FormBuilder,
                private utilsService : UtilsService,
                private _titleService: Title
      ) { super(formBuilder); }


    getError(err : HttpErrorResponse): void{
      super.getError(err);
      this.isLoadingPage = false;
    }

    updatedBlogs(result: number) : void
    {
      this.saveTime =  this.utilsService.getDateFormated(new Date( Date.now()));
      this.isLoading = false;
      this.savedData = result;

      this.isError = false;
      if (this.savedData == 0)
      {
          this.isError = true;
          this.messageError = "Registro não foi gravado, tente recarregar a pagina e tente novamente";
      }
      else
        this.SavedSuccess = true

    }

    savedBlogs (_blog : blogs) : void{

      this.isLoading = false;

      if (_blog)
      {
        this.saveTime =  this.utilsService.getDateFormated(new Date( Date.now()));
        this.SavedSuccess = true;
      }

      if (this.isNew)
      {
        this.router.navigate(["/admin/blog/" + _blog.Key]);
        this.isNew = false;
      }
    }

    populateBlogs (_blog : blogs) : void{
      this.isLoadingPage = false;
      this.isLoading = false;
      this.blogsRegister = _blog;
      this.formulario.patchValue(_blog);
    }

    getBlogRegister(key: string): void
    {
      if (key != "novo"){
        this.getBlogByKeySubscription$ = this._AdminBlogService.getBlogByKey$(key).subscribe(this.blogsFile);
      }
      else
      {
        this.isNew = true;
        this.isLoadingPage = false;
        //this.formulario.controls["active"].setValue("true");
      }
    }

    getParameters(): void
    {
      this.routeparamsSubscription$ = this.route.params.subscribe(this.parameterIdObserver);
    }

    insertImage() : void
    {
      const imgTag : string = "<img src=\"" + this.ImagemAddressAuxText + "\">";
      this.text_Content = this.text_Content.replace("_img",imgTag);
    }

    ngOnInit(): void {
      this._titleService.setTitle("Massoterapia Admin - Blog");
      this.buildFormulario();
      this.getParameters();

    }

    ngOnDestroy() : void{
      this.getBlogByKeySubscription$?.unsubscribe();
      this.routeparamsSubscription$?.unsubscribe();
      this.createBlogSubscription$?.unsubscribe();
      this.updateBlogSubscription$?.unsubscribe();
    }

    submit():void{

      this.isLoading = true;
      this.isError = false;
      this.SavedSuccess = false;
      this.formulario.controls["TitleNFD"].setValue(this.utilsService.removeAccent(this.formulario.get("Title").value))

      let valueSubmit = Object.assign({}, this.formulario.value);

      if (this.isNew)
        this.createBlogSubscription$ = this._AdminBlogService.createBlog$(valueSubmit).subscribe(this.blogsSaved);
      else
        this.updateBlogSubscription$ = this._AdminBlogService.updateBlog$(valueSubmit).subscribe(this.blogsUpdated);

    }

    submitFail():void{}

    buildFormulario() : void
    {
      this.formulario =
      new FormGroup (
        {
          Title : new FormControl('',[ Validators.required, Validators.minLength(25)]),
          ImageCard : new FormControl('',[Validators.required]),
          Active : new FormControl(true),
          Tags : new FormControl('',[Validators.required]),
          Text : new FormControl('',[Validators.required]),
          Key : new FormControl(''),
          TitleNFD : new FormControl(''),
          ImagemAddressAux : new FormControl('')
        }
        );
    }


}
