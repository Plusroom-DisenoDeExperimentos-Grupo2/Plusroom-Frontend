import { Component, OnInit, signal } from '@angular/core';
import { PostService } from '../../services/post.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';

// modules
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';

// models
import { Post } from '../../models/post.model';

interface CategorySelect {
  value: string;
  viewValue: string;
}

enum Category {
  ROOM = 'room',
  APARTMENT = 'apartment',
  HOUSE = 'house',
}

@Component({
  selector: 'app-post-form',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatRadioModule,
    MatCheckboxModule,
    CommonModule
  ],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css'
})
export class PostFormComponent implements OnInit {


  // to create a new post
  newPost!: any;

  // to modify error message -> price field
  errorMessage = signal('');

  // Receive post data to edit
  editPostData!: Post;

  // Model
  post!: Post;

  // Post categories select
  categories: CategorySelect[] = [
    { value: Category.ROOM, viewValue: 'Habitación' },
    { value: Category.APARTMENT, viewValue: 'Departamento' },
    { value: Category.HOUSE, viewValue: 'Casa' },
  ];

  // Post Form Type -> create or edit
  // formFieldType: string = 'edit'; // or 'create' ------ modificar 
  formFieldType: string = 'create'; // or 'create' ------ modificar 

  // Form title --> create or edit
  formTypeTitle: string = this.formFieldType === 'edit' ? 'Editar Publicación' : 'Crear Publicación';

  // Form
  postForm: FormGroup;
  title: FormControl;
  description: FormControl;
  location: FormControl;
  price: FormControl;
  category: FormControl;
  rooms: FormControl;
  bathrooms: FormControl;
  pets: FormControl;
  smoking: FormControl;

  constructor(private postService: PostService) {
    // form validation
    this.title = new FormControl('', Validators.required);
    this.description = new FormControl('', Validators.required);
    this.location = new FormControl('', Validators.required);
    this.price = new FormControl('', [Validators.required, Validators.min(1)]);
    this.category = new FormControl('');
    this.rooms = new FormControl('', Validators.required);
    this.bathrooms = new FormControl('', Validators.required);
    this.pets = new FormControl(false);
    this.smoking = new FormControl(false);

    // form group
    this.postForm = new FormGroup({
      title: this.title,
      description: this.description,
      location: this.location,
      price: this.price,
      category: this.category,
      rooms: this.rooms,
      bathrooms: this.bathrooms,
      pets: this.pets,
      smoking: this.smoking,
    });

    // update error message
    merge(this.price.statusChanges, this.price.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());

  }

  updateErrorMessage() {
    if (this.price.hasError('required')) {
      this.errorMessage.set('Precio requerido');
    }
    else if (this.price.hasError('min')) {
      this.errorMessage.set('El precio debe ser mayor a 0');
    } else {
      this.errorMessage.set('');
    }
  }

  ngOnInit() {
    if (this.formFieldType === 'edit') {
      // Code to get post data to edit
      //
      //

      // default post to edit
      const testPostId = 4;
      this.getPostToEdit(testPostId);
    }
  }

  // Default values used to create a post
  available: boolean = true;
  landlordId: any = 1;

  createPost() {
    let precio = parseInt(this.postForm.value.price);

    this.newPost = {
      title: this.postForm.value.title,
      description: this.postForm.value.description,
      location: this.postForm.value.location,
      price: precio,
      category: this.postForm.value.category,
      urlPhoto: this.previewUrl,
      available: true,
      rooms: this.postForm.value.rooms,
      bathrooms: this.postForm.value.bathrooms,
      pets: this.postForm.value.pets,
      smoking: this.postForm.value.smoking,
      landlordId: 1,
    };

    this.postService.createPost(this.newPost).subscribe({
      next: (data: any) => {
        console.log('Post successfully created', data);
        const postId = data.id;

        if (this.selectedImageFile) {
          const formData = new FormData();
          formData.append('files', this.selectedImageFile);

          this.postService.uploadImage(postId, formData).subscribe({
            next: (res: any) => {
              console.log('Image uploaded successfully', res);
            },
            error: err => console.error('Error al subir imagen', err)
          });
        }
      },
      error: (e) => {
        console.log('Error al crear el post', e);
      }
    });

  }

  getPostToEdit(postId: number) {
    this.postService.getPost(postId).subscribe({
      next: (postData: Post) => {
        this.editPostData = postData;

        this.post = postData;

        // set form values
        this.postForm.setValue({
          title: postData.title || '',
          description: postData.description || '',
          location: postData.location || '',
          price: postData.price || 0,
          category: postData.category || '',
        });

        this.previewUrl = postData.urlPhoto || null;
      },
      error: (e) => {
        console.error('Error getting post to edit:', e);
      }
    });
  }

  updatePost() {
    const updatedPost = {
      ...this.post,
      ...this.postForm.value,
      urlPhoto: this.previewUrl
    };

    this.postService.updatePost(updatedPost).subscribe({
      next: (data: any) => {
        console.log('Post updated successfully', data);
      },
      error: (e) => {
        console.log('Error updating post', e);
      }
    });
  }

  onSubmit() {
    this.postForm.markAllAsTouched();

    if (this.postForm.invalid) {
      console.warn('Formulario inválido. Corrige los errores antes de continuar.');
      return;
    }

    console.log('Form submitted:', this.postForm.value);
    if (this.formFieldType === 'edit') {
      console.log('Updating post:', this.postForm.value);
      this.updatePost();
    } else if (this.formFieldType === 'create') {
      console.log('Creating new post:', this.postForm.value);
      this.createPost();
      this.onReset();
    }
  }

  // Reset form -> clear error messages
  onReset() {
    this.errorMessage.set('');
    this.previewUrl = null;
    this.isDragOver = false;

    this.postForm.reset();
    Object.keys(this.postForm.controls).forEach(key => {
      const control = this.postForm.get(key);
      control?.markAsPristine();
      control?.markAsUntouched();
      control?.setErrors(null);
    });
  }

  // section
  // Image -> drage & drop

  isDragOver = false;
  previewUrl: string | ArrayBuffer | null = null;

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
    if (event.dataTransfer?.files.length) {
      this.handleFile(event.dataTransfer.files[0]);
    }
  }

  selectedImageFile!: File;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.handleFile(input.files[0]);
    }
  }

  handleFile(file: File): void {
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen.');
      return;
    }

    this.selectedImageFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }

  removeImage() {
    this.previewUrl = null;
  }
}
